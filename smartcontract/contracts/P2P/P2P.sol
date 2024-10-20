// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../ITRC20.sol";
import "../glint.sol";

/**
 * @title P2PLending
 * @dev A decentralized peer-to-peer lending platform
 */
contract P2PLending {

    // TODO: Track both lender and borrower record

    // Struct to represent a lender's loan proposal
    struct LoanProposal {
        address lender;
        uint256 loanAmount;      // Amount of stable tokens offered by lender
        uint256 interestRate;    // Interest rate for the loan
        uint256 duration;        
        uint256 collateralAmount; 
        uint256 collaterakMin; 
        uint256 collateralMax;
        address collateralToken;  
        address loanToken;        
        bool isActive;           
    }

//      // Struct to represent an active loan
    struct ActiveLoan {
        address borrower;
        uint256 loanAmount;
        uint256 interestRate;
        uint256 duration;
        uint256 startTime;
        uint256 collateralAmount;
        address collateralToken;
        address loanToken;
        bool isRepaid;
    }

    uint256 public proposalCounter; // Unique ID for each loan proposal
    uint256 public loanCounter;     // Unique ID for each active loan

    // Mapping to track loan proposals
    mapping(uint256 => LoanProposal) public loanProposals;

    // Mapping to track active loans
    mapping(uint256 => ActiveLoan) public activeLoans;

    // Mapping to track the collateral locked by borrowers for a loan
    mapping(uint256 => bool) public collateralLocked;

    // Events
    event LoanProposalCreated(
        uint256 indexed proposalId,
        address indexed lender,
        uint256 loanAmount,
        uint256 interestRate,
        uint256 duration,
        uint256 collateralAmount,
        uint256 collateralMin,
        uint256 collateralMax,
        address collateralToken,
        address loanToken
    );

    event LoanAccepted(uint256 indexed loanId, address indexed borrower, uint256 indexed proposalId);

    event LoanRepaid(uint256 indexed loanId, address indexed borrower, uint256 amountRepaid);

    event LoanDefaulted(uint256 indexed loanId, address indexed lender, uint256 collateralClaimed);


    // TODO: Track both lender and borrower record

   /**
     * @notice Lender creates a new loan proposal for borrowers to browse.
     * @param loanAmount Amount of stable tokens to lend.
     * @param interestRate Interest rate for the loan.
     * @param duration Duration of the loan in blocks or time.
     * @param collateralAmount Required collateral from borrower.\
     * @param collateralMin Min required collateral from borrower
     * @param collateralMax Max required collateral from borrower
     * @param collateralToken The volatile token (e.g., TRON) offered as collateral.
     * @param loanToken The stable token (e.g., USDT) being lent out.
     */
    function createLoanProposal(
        uint256 loanAmount,
        uint256 interestRate,
        uint256 duration,
        uint256 collateralAmount,
        uint256 collateralMin,
        uint256 collateralMax,
        address collateralToken,
        address loanToken
    ) external {
        require(loanAmount > 0, "Loan amount must be greater than 0");
        require(collateralAmount > 0, "Collateral amount must be greater than 0");

        proposalCounter++;

        loanProposals[proposalCounter] = LoanProposal({
            lender: msg.sender,
            loanAmount: loanAmount,
            interestRate: interestRate,
            duration: duration,
            collateralAmount: collateralAmount,
            collaterakMin : collateralMin,
            collateralMax : collateralMax,
            collateralToken: collateralToken,
            loanToken: loanToken,
            isActive: true
        });

        emit LoanProposalCreated(
            proposalCounter,
            msg.sender,
            loanAmount,
            interestRate,
            duration,
            collateralAmount,
            collateralMin,
            collateralMax,
            collateralToken,
            loanToken
        );
    }

    /**
     * @notice Borrower accepts a loan proposal and provides the collateral.
     * @param proposalId ID of the loan proposal to accept.
     */
    function acceptLoanProposal(uint256 proposalId) external {
        LoanProposal storage proposal = loanProposals[proposalId];
        require(proposal.isActive, "Proposal is no longer active");

        // Lock collateral from the borrower
        ITRC20(proposal.collateralToken).transferFrom(msg.sender, address(this), proposal.collateralAmount);
        collateralLocked[loanCounter] = true;

        // Create a new active loan
        loanCounter++;
        activeLoans[loanCounter] = ActiveLoan({
            borrower: msg.sender,
            loanAmount: proposal.loanAmount,
            interestRate: proposal.interestRate,
            duration: proposal.duration,
            startTime: block.timestamp,
            collateralAmount: proposal.collateralAmount,
            collateralToken: proposal.collateralToken,
            loanToken: proposal.loanToken,
            isRepaid: false
        });

        // Transfer loan tokens from lender to borrower
        ITRC20(proposal.loanToken).transferFrom(proposal.lender, msg.sender, proposal.loanAmount);

        // Mark the proposal as inactive
        proposal.isActive = false;

        emit LoanAccepted(loanCounter, msg.sender, proposalId);
    }

     // Repay Loan (Borrower)
    function repayLoan(uint256 activeLoanId) external {
        ActiveLoan storage activeLoan = activeLoans[activeLoanId];
        require(msg.sender == activeLoan.borrower, "Only borrower can repay");
        require(!activeLoan.isRepaid, "Loan already repaid");

        // Calculate the repayment amount (loan amount + interest)
        uint256 repaymentAmount = activeLoan.loanAmount + (activeLoan.loanAmount * activeLoan.interestRate / 100);
        
        // Transfer repayment (loan + interest) to lender
        require(ITRC20(activeLoan.loanToken).transferFrom(msg.sender, activeLoan.borrower, repaymentAmount), "Repayment transfer failed");

        // Return collateral to the borrower
        require(ITRC20(activeLoan.collateralToken).transfer(activeLoan.borrower, activeLoan.collateralAmount), "Collateral return failed");

        activeLoan.isRepaid = true;

        emit LoanRepaid(activeLoanId, msg.sender, repaymentAmount);
    }

    // Retrieve Loan Proposal details
    function getLoanProposal(uint256 loanId) external view returns (LoanProposal memory) {
        return loanProposals[loanId];
    }

    // Retrieve Active Loan details
    function getActiveLoan(uint256 activeLoanId) external view returns (ActiveLoan memory) {
        return activeLoans[activeLoanId];
    }


}
