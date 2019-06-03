pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Superheroes {
  Superhero[] public superheroes;
  mapping (uint => uint) superheroesVotes;
  mapping (address => uint[]) userVotes;
  mapping (uint => Review[]) superheroesReviews;

  address private owner;

  modifier onlyOwner() {
    require(msg.sender == owner, "Sorry, only for owners");
    _;
  }

  constructor() public {
    owner = msg.sender;
  }

  uint superheroCount;

  struct Review {
    address author;
    uint mark;
    string text;
  }

  struct Superhero {
    uint id;
    string name;
    string avatar;
    string category;
    string description;
  }

  event NewReview(address author, uint mark, string text);
  event NewSuperhero(uint id, string  name, string avatar, string category, string description);

  function review(uint superHeroID, uint mark, string memory reviewText) public {
    require(msg.sender != address(0), "You must be a real user");
    require(getHero(superHeroID).id!=0, "Hero must exists");

    superheroesReviews[superHeroID].push(Review(msg.sender, mark, reviewText));
    emit NewReview(msg.sender, mark, reviewText);
  }

  function addSuperhero(string memory name, string memory avatar, string memory category, string memory description) public onlyOwner returns (uint heroID, string memory heroName, string memory heroAvatar, string memory heroCategory, string memory heroDescription) {
    superheroCount++;
    Superhero memory newHero = Superhero(superheroCount, name, avatar, category, description);
    superheroes.push(newHero);
    emit NewSuperhero(superheroCount, newHero.name, newHero.avatar, newHero.category, newHero.description);
    return (newHero.id, newHero.name, newHero.avatar, newHero.category, newHero.description);
  }

  function removeSuperHero(uint heroID) public onlyOwner {
    superheroes[heroID] = Superhero(0, '', '', '', '');
    delete superheroesReviews[heroID];
  }

  function string_tobytes( string memory s) pure internal returns (bytes memory result){
    bytes memory b3 = bytes(s);
    return b3;
  }

  function getSuperHeroes() public view returns (Superhero[] memory result ) {
    return superheroes;
  }

  function getHero(uint id) public view returns(Superhero memory hero) {
    for(uint i = 0; i<superheroCount;i++) {
      if(superheroes[i].id==id) {
        return superheroes[i];
      }
    }
  }

  function getSuperheroReviews(uint superheroID) public view returns(Review[] memory reviews) {
    return superheroesReviews[superheroID];
  }


}
