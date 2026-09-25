/**
 * 🗳️ Panchayat Election System - Capstone
 *
 * Village ki panchayat election ka system bana! Yeh CAPSTONE challenge hai
 * jisme saare function concepts ek saath use honge:
 * closures, callbacks, HOF, factory, recursion, pure functions.
 *
 * Functions:
 *
 *   1. createElection(candidates)
 *      - CLOSURE: private state (votes object, registered voters set)
 *      - candidates: array of { id, name, party }
 *      - Returns object with methods:
 *
 *      registerVoter(voter)
 *        - voter: { id, name, age }
 *        - Add to private registered set. Return true.
 *        - Agar already registered or voter invalid, return false.
 *        - Agar age < 18, return false.
 *
 *      castVote(voterId, candidateId, onSuccess, onError)
 *        - CALLBACKS: call onSuccess or onError based on result
 *        - Validate: voter registered? candidate exists? already voted?
 *        - If valid: record vote, call onSuccess({ voterId, candidateId })
 *        - If invalid: call onError("reason string")
 *        - Return the callback's return value
 *
 *      getResults(sortFn)
 *        - HOF: takes optional sort comparator function
 *        - Returns array of { id, name, party, votes: count }
 *        - If sortFn provided, sort results using it
 *        - Default (no sortFn): sort by votes descending
 *
 *      getWinner()
 *        - Returns candidate object with most votes
 *        - If tie, return first candidate among tied ones
 *        - If no votes cast, return null
 *
 *   2. createVoteValidator(rules)
 *      - FACTORY: returns a validation function
 *      - rules: { minAge: 18, requiredFields: ["id", "name", "age"] }
 *      - Returned function takes a voter object and returns { valid, reason }
 *
 *   3. countVotesInRegions(regionTree)
 *      - RECURSION: count total votes in nested region structure
 *      - regionTree: { name, votes: number, subRegions: [...] }
 *      - Sum votes from this region + all subRegions (recursively)
 *      - Agar regionTree null/invalid, return 0
 *
 *   4. tallyPure(currentTally, candidateId)
 *      - PURE FUNCTION: returns NEW tally object with incremented count
 *      - currentTally: { "cand1": 5, "cand2": 3, ... }
 *      - Return new object where candidateId count is incremented by 1
 *      - MUST NOT modify currentTally
 *      - If candidateId not in tally, add it with count 1
 *
 * @example
 *   const election = createElection([
 *     { id: "C1", name: "Sarpanch Ram", party: "Janata" },
 *     { id: "C2", name: "Pradhan Sita", party: "Lok" }
 *   ]);
 *   election.registerVoter({ id: "V1", name: "Mohan", age: 25 });
 *   election.castVote("V1", "C1", r => "voted!", e => "error: " + e);
 *   // => "voted!"
 */
export function createElection(candidates) {
  // Private state - closure
  const votes = {};
  const registeredVoters = new Set();
  const votedVoters = new Set();

  const candidateList = Array.isArray(candidates) ? candidates : [];

  function registerVoter(voter) {
    if (
      !voter ||
      !voter.id ||
      !voter.name ||
      typeof voter.age !== "number" ||
      voter.age < 18
    ) {
      return false;
    }

    if (registeredVoters.has(voter.id)) {
      return false;
    }

    registeredVoters.add(voter.id);

    return true;
  }

  function castVote(voterId, candidateId, onSuccess, onError) {
    if (typeof onSuccess !== "function" || typeof onError !== "function") {
      return null;
    }

    if (!registeredVoters.has(voterId)) {
      return onError("voter not registered");
    }

    const candidate = candidateList.find(
      (candidate) => candidate.id === candidateId,
    );

    if (!candidate) {
      return onError("candidate not found");
    }

    if (votedVoters.has(voterId)) {
      return onError("voter already voted");
    }

    votes[candidateId] = (votes[candidateId] || 0) + 1;
    votedVoters.add(voterId);

    return onSuccess({
      voterId,
      candidateId,
    });
  }

  function getResults(sortFn) {
    const results = candidateList.map((candidate) => ({
      id: candidate.id,
      name: candidate.name,
      party: candidate.party,
      votes: votes[candidate.id] || 0,
    }));

    if (typeof sortFn === "function") {
      return results.sort(sortFn);
    }

    return results.sort((a, b) => b.votes - a.votes);
  }

  function getWinner() {
    if (candidateList.length === 0) {
      return null;
    }

    let winner = null;
    let highestVotes = 0;

    for (const candidate of candidateList) {
      const candidateVotes = votes[candidate.id] || 0;

      if (candidateVotes > highestVotes) {
        highestVotes = candidateVotes;
        winner = candidate;
      }
    }

    if (highestVotes === 0) {
      return null;
    }

    return winner;
  }

  return {
    registerVoter,
    castVote,
    getResults,
    getWinner,
  };
}

export function createVoteValidator(rules) {
  return function (voter) {
    if (!voter) {
      return {
        valid: false,
        reason: "voter is invalid",
      };
    }

    const requiredFields = Array.isArray(rules?.requiredFields)
      ? rules.requiredFields
      : [];

    for (const field of requiredFields) {
      if (
        voter[field] === undefined ||
        voter[field] === null ||
        voter[field] === ""
      ) {
        return {
          valid: false,
          reason: `missing ${field}`,
        };
      }
    }

    if (typeof rules?.minAge === "number" && voter.age < rules.minAge) {
      return {
        valid: false,
        reason: "voter is underage",
      };
    }

    return {
      valid: true,
      reason: "",
    };
  };
}

export function countVotesInRegions(regionTree) {
  if (!regionTree || typeof regionTree !== "object") {
    return 0;
  }

  const currentVotes =
    typeof regionTree.votes === "number" ? regionTree.votes : 0;

  const subRegions = Array.isArray(regionTree.subRegions)
    ? regionTree.subRegions
    : [];

  if (subRegions.length === 0) {
    return currentVotes;
  }

  return (
    currentVotes +
    subRegions.reduce((total, region) => total + countVotesInRegions(region), 0)
  );
}

export function tallyPure(currentTally, candidateId) {
  const tally =
    currentTally && typeof currentTally === "object" ? currentTally : {};

  return {
    ...tally,
    [candidateId]: (tally[candidateId] || 0) + 1,
  };
}
