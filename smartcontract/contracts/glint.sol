// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

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
  }

  struct UserProfile {
    string name;
    string email;
    string bio;
    string[] social_links;
    bool verified;
    bool flagged;
  }

  uint256 public campaignCounter;
  uint256 public userCounter;
  address[] public userAddresses;

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
    bool _refundable
    ) external {
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
        refundable : _refundable
      });

      userCampaigns[msg.sender].push(campaignCounter);

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


}
