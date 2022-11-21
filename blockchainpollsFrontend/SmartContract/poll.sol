// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract PollContract{

    struct Poll {
        uint256 id;
        string question;
        string image;
        uint64[] votes;
        bytes32[] options;

    }

    struct Voter{
        address id;
        uint256[] votedIds;
        mapping(uint256 => bool) votedMap;
    }

    Poll[] private polls;
    mapping(address => Voter) private voters;

    event PollCreated(uint256 _pollId);


    function creatPoll(string memory _question, string memory _img, bytes32[] memory _options) public {
        require(bytes(_question).length > 0, "Empty question !");
        require(_options.length > 1, "At least 2 options required !");

        uint256 idPoll = polls.length;

        Poll memory newPoll = Poll({
            id: idPoll,
            question: _question,
            image: _img,
            options: _options,
            votes: new uint64[](_options.length)
        });

        polls.push(newPoll);
        emit PollCreated(idPoll);
    }


    function getPoll(uint256 _pollid) external view returns(uint256, string memory, string memory, uint64[] memory, bytes32[] memory){
        require(_pollid < polls.length && _pollid >= 0, "No poll found");
        return(
            polls[_pollid].id,
            polls[_pollid].question,
            polls[_pollid].image,
            polls[_pollid].votes,
            polls[_pollid].options
        );
    }

    function vote(uint256 _pollid, uint64 _vote) external {
        require(_pollid < polls.length , "Poll does not exist");
        require(_vote < polls[_pollid].options.length, "Invalide vote");
        require(voters[msg.sender].votedMap[_pollid] == false, "You already voted !");

        polls[_pollid].votes[_vote] += 1;
        voters[msg.sender].votedIds.push(_pollid);
        voters[msg.sender].votedMap[_pollid] = true;
    }

    function getVoter(address _id) external view returns(address, uint256[] memory){

        return(
            voters[_id].id,
            voters[_id].votedIds
        );
    }

    function getTotalPolls() external view returns(uint256){
        return polls.length;
    }
    
}