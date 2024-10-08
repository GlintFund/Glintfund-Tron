// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./ITRC20.sol";

contract Glint {

  // A slight modification to make the contract "different"
  // uint256 public versions = 1;
  // uint256 public version = 1;
  uint256 public version3 = 1;
  
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
    function donate(uint256 id, address tokenAddress) external payable {
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

    /**
     * @notice Finalizes a campaign once the funding goal is met
     * @param campaignId The ID of the campaign to finalize
      * @param tokenAddress The address of the token to transfer and finalize
     */
    function finalizeCampaign(uint256 campaignId, address tokenAddress) public {
        Campaign storage campaign = campaigns[campaignId];
        require(campaign.admin == msg.sender, "Only the owner can finalize");
        require(campaign.amount_donated >= campaign.amount_required, "Funding goal not met");

        // Mark campaign as completed and transfer raised funds to the owner
        campaign.donation_complete = true;
        ITRC20(tokenAddress).transfer(campaign.admin, campaign.amount_donated);
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
