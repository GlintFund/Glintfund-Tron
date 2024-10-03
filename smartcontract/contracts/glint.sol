// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Glint {

  struct Campaign {
    uint8 id;
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
  mapping(uint256 => Campaign) public campaigns;
  mapping(address => UserProfile) public userProfiles;


}
