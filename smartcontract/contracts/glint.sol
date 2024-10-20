// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./ITRC20.sol";

contract Glint {
  
  struct Campaign {
    uint256 id;
    address payable admin; // * Campaign creator 
    string title;
    string description;
    string[] tags;
    uint256 amount_required;
    uint256 amount_donated;
    bool donation_complete;
    uint256 endTime;
    bool refundable;
    string donationType;
  }

  struct UserProfile {
    string name;
    address userAddress;
    string email;
    string bio;
    string[] social_links;
    bool verified;
    bool flagged;
    string[] interests;
  }

  uint256 public campaignCounter;
  uint256 public userCounter;
  address[] public userAddresses;

  Campaign[] public _campaigns;

  mapping(uint256 => Campaign) public campaigns;
  mapping(address => UserProfile) public userProfiles;
  mapping(address => uint256[]) public userCampaigns;
  mapping(uint256 => mapping(address => uint256)) public donatedAmount;

  event Launch(
    uint256 id,
    address indexed admin,
    string title,
    string description,
    string[] tags,
    uint256 amount_required,
    uint256 endTime,
    bool refundable
  );
  event Donate(
    uint256 indexed id,
    address indexed donator,
    uint256 amount
  );
  event Refund(
    uint256 id,
    address indexed donator,
    uint256 amount
  );
  event Claim(
    uint256 id
  );
  event UserProfileUpdated(
    address indexed userAddress,
    string name,
    string email,
    string bio,
    string[] social_links,
    bool verified,
    bool flagged
  );

  // constructor(string memory _message) {
  //       TRC20(_message); // Set the initial message when the contract is deployed
  //   }

  modifier onlyAdmin(uint256 campaignId) {
    require(campaigns[campaignId].admin == msg.sender, "Only the admin of this campaign is allowed");
    _;
  }

  function create(
    string memory _title, 
    string memory _description, 
    uint64 amountRequired, 
    string[] memory _tags,
    uint256 _endTime,
    bool _refundable,
    string memory _donationType
    ) external {

      require(amountRequired > 0, "Goal must be greater than 0");

      campaignCounter++;
      campaigns[campaignCounter] = Campaign({
        id: campaignCounter,
        admin: payable(msg.sender),
        title: _title,
        description: _description,
        tags: _tags,
        amount_required: amountRequired,
        amount_donated: 0,
        donation_complete: false,
        endTime : _endTime,
        refundable : _refundable,
        donationType : _donationType
      });

      userCampaigns[msg.sender].push(campaignCounter);
      _campaigns.push(campaigns[campaignCounter]);

      emit Launch(
        campaignCounter,
        msg.sender,
        _title,
        _description,
        _tags,
        amountRequired,
        _endTime,
        _refundable
      );
  }

  // Get all campaigns
    function getAllCampaigns() external view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](campaignCounter);
        for (uint256 i = 1; i <= campaignCounter; i++) {
            allCampaigns[i - 1] = campaigns[i];
        }
        return allCampaigns;
    }

    function getAllCampaigns2() public view returns (Campaign[] memory) {
        return _campaigns;
    }

    // Get a specific campaign
    function getCampaign(
        uint256 campaignId
    ) external view returns (Campaign memory) {
        require(
            campaignId > 0 && campaignId <= campaignCounter,
            "Campaign does not exist"
        );
        return campaigns[campaignId];
    }

     /**
     * @notice Contributes funds to a specific campaign
     * @param id The ID of the campaign to contribute to
     * @param tokenAddress The address of the token being contributed
     */
    function multiDonate(uint256 id, address tokenAddress) external payable {
        Campaign storage campaign = campaigns[id];
        require(!campaign.donation_complete, "Campaign closed, donation complete");
        require(msg.value > 0, "Contribution must be greater than 0");

        campaign.amount_donated += uint256(msg.value);
        donatedAmount[id][msg.sender] += uint256(msg.value);

        // Transfer tokens from the contributor to the campaign
        ITRC20(tokenAddress).transferFrom(msg.sender, address(this), msg.value);

        emit Donate(id, msg.sender, uint256(msg.value));

        if (campaign.amount_donated >= campaign.amount_required) {
            campaign.donation_complete = true;
        }
    }

    function donate(uint256 id) external payable {
        Campaign storage campaign = campaigns[id];
        
   
        require(!campaign.donation_complete, "donation complete");
        require(msg.value > 0, "No TRX sent");

    
        campaign.amount_donated += msg.value;
        donatedAmount[id][msg.sender] += msg.value;

        emit Donate(id, msg.sender, msg.value);

        // Check if the required amount has been reached and mark donation as complete if so
        if (campaign.amount_donated >= campaign.amount_required) {
            campaign.donation_complete = true;
        }
    }


    function pledge(uint256 id) external payable {
      Campaign storage campaign = campaigns[id];
      
      // Ensure that the donation is not complete
      require(!campaign.donation_complete, "donation complete");
      // Ensure that some TRX is sent
      require(msg.value > 0, "No TRX sent");

      // Add the donated amount to the campaign's total
      campaign.amount_donated += msg.value;
      // Track the donated amount for this donor
      donatedAmount[id][msg.sender] += msg.value;

      // Emit the Donate event
      emit Donate(id, msg.sender, msg.value);

      // Check if the required amount has been reached and mark donation as complete if so
      if (campaign.amount_donated >= campaign.amount_required) {
          campaign.donation_complete = true;
      }
  }

  function pledgeAdmin(uint256 id) external payable {
    Campaign storage campaign = campaigns[id];
    
    // Ensure that the donation is not complete
    require(!campaign.donation_complete, "Donation already complete");
    // Ensure that some TRX is sent
    require(msg.value > 0, "No TRX sent");

    // Add the donated amount to the campaign's total
    campaign.amount_donated += msg.value;
    // Track the donated amount for this donor
    donatedAmount[id][msg.sender] += msg.value;

    // Transfer the TRX to the campaign admin
    (bool success, ) = campaign.admin.call{value: msg.value}("");
    require(success, "Transfer to campaign admin failed");

    // Emit the Donate event
    emit Donate(id, msg.sender, msg.value);

    // Check if the required amount has been reached and mark donation as complete if so
    if (campaign.amount_donated >= campaign.amount_required) {
        campaign.donation_complete = true;
    }
}


    /**
     * @notice Finalizes a campaign once the funding goal is met
     * @param campaignId The ID of the campaign to finalize
      * @param tokenAddress The address of the token to transfer and finalize
     */
    function multiFinalizeCampaign(uint256 campaignId, address tokenAddress) public {
        Campaign storage campaign = campaigns[campaignId];
        require(campaign.admin == msg.sender, "Only the owner can finalize");
        require(campaign.amount_donated >= campaign.amount_required, "Funding goal not met");

        // Mark campaign as completed and transfer raised funds to the owner
        campaign.donation_complete = true;
        ITRC20(tokenAddress).transfer(campaign.admin, campaign.amount_donated);
    }

    function finalizeCampaign(uint256 campaignId) public {
        Campaign storage campaign = campaigns[campaignId];

        // Ensure only the campaign admin can finalize
        require(campaign.admin == msg.sender, "Only the owner can finalize");
        // Ensure the campaign has raised enough funds
        require(campaign.amount_donated >= campaign.amount_required, "Funding goal not met");
        // Check if the campaign is already finalized
        require(!campaign.donation_complete, "Campaign is already finalized");

        // Mark the campaign as complete before transferring funds (reentrancy protection)
        campaign.donation_complete = true;

        // Transfer the raised TRX funds to the admin
        (bool success, ) = campaign.admin.call{value: campaign.amount_donated}("");
        require(success, "TRX Transfer failed");

        // Emit an event for logging
        emit Claim(campaignId);
    }

    function refund(uint256 id) external {
        Campaign storage campaign = campaigns[id];

        // Check that the campaign is refundable and not yet completed
        require(campaign.refundable, "Campaign is not refundable");
        require(!campaign.donation_complete, "Cannot refund, campaign is complete");

        // Check the user donated something
        uint256 donatedAmountForUser = donatedAmount[id][msg.sender];
        require(donatedAmountForUser > 0, "No donation found to refund");

        // Reset the user's donated amount to 0
        donatedAmount[id][msg.sender] = 0;

        // Reduce the total amount donated to the campaign
        campaign.amount_donated -= donatedAmountForUser;

        // Transfer the TRX back to the user
        (bool success, ) = msg.sender.call{value: donatedAmountForUser}("");
        require(success, "Refund transfer failed");

        // Emit Refund event
        emit Refund(id, msg.sender, donatedAmountForUser);
    }


    function getAllCampaigns1() external view returns (Campaign[] memory) {
    Campaign[] memory allCampaigns = new Campaign[](campaignCounter);
    for (uint256 i = 1; i <= campaignCounter; i++) {
        Campaign storage campaign = campaigns[i]; // Fetch from storage
        allCampaigns[i - 1] = Campaign(
            campaign.id,
            campaign.admin,
            campaign.title,
            campaign.description,
            campaign.tags, // Copying the tags array
            campaign.amount_required,
            campaign.amount_donated,
            campaign.donation_complete,
            campaign.endTime,
            campaign.refundable,
            campaign.donationType
        );
    }
    return allCampaigns;
}

    // Manage user profile
    function updateUserProfile(
        string memory _name,
        string memory _email,
        string memory _bio,
        string[] memory _socialLinks,
        string[] memory _interests
    ) external {
        if (userProfiles[msg.sender].userAddress == address(0)) {
            userCounter++;
            userAddresses.push(msg.sender);
        }

        userProfiles[msg.sender] = UserProfile({
            userAddress: msg.sender,
            name: _name,
            email: _email,
            bio: _bio,
            social_links: _socialLinks,
            verified : false,
            flagged : false,
            interests : _interests
        });

        emit UserProfileUpdated(msg.sender, _name, _email, _bio, _socialLinks, false, false);
    }

    // Get a specific user profile
    function getUserProfile(
        address userAddress
    ) external view returns (UserProfile memory) {
        require(
            userProfiles[userAddress].userAddress != address(0),
            "User does not exist"
        );
        return userProfiles[userAddress];
    }

    // Get all users
    function getAllUsers() external view returns (UserProfile[] memory) {
        UserProfile[] memory allUsers = new UserProfile[](userCounter);
        for (uint256 i = 0; i < userCounter; i++) {
            allUsers[i] = userProfiles[userAddresses[i]];
        }
        return allUsers;
    }


}
