import Web3 from 'web3';
import { init , executeTransaction, call } from './Blockchain/web3Client';



export const creatPoll = (poll) => {

    executeTransaction("creatPoll", poll.question, poll.image || '', poll.options.map((opt) => Web3.utils.fromAscii(opt)));

}


export const vote = (pollId, vote) => {
    executeTransaction("vote",pollId, vote);
}


export const normalizeVoter = (voter) => {
    return{id: voter[0], votedPolls: voter[1].map(vote => parseInt(vote))}
}

export const normalizePoll = (poll, voter) => {

    return{
        id: parseInt(poll[0]),
        question: poll[1],
        image: poll[2],
        results: poll[3].map(res => parseInt(res)),
        options: poll[4].map(opt => Web3.utils.toAscii(opt).replace(/\u0000/g,''))
    }
}