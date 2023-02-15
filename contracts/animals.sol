// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

interface Living {
    function eat(string memory food) external returns (string memory);
}

contract HasName {
    string internal _name;

    constructor(string memory name) {
        _name = name;
    }

    function getName() public view returns (string memory) {
        return _name;
    }
}

abstract contract Animal is Living {
    function eat(string memory food)
        public
        pure
        virtual
        returns (string memory)
    {
        return string.concat(string.concat("Animal eats ", food));
    }

    function speak() public pure virtual returns (string memory) {
        return "...";
    }

    function sleep() public pure returns (string memory) {
        return "Z-z-z";
    }
}

library StringComparer {
    function compare(string memory str1, string memory str2)
        internal
        pure
        returns (bool)
    {
        return
            keccak256(abi.encodePacked(str1)) ==
            keccak256(abi.encodePacked(str2));
    }
}

abstract contract Herbivore is Animal {
    string constant PLANT = "plant";
    modifier eatOnlyPlant(string memory food) {
        require(StringComparer.compare(food, PLANT), "Can Eat only plant");
        _;
    }

    function eat(string memory food)
        public
        pure
        virtual
        override
        eatOnlyPlant(food)
        returns (string memory)
    {
        return super.eat(food);
    }
}

abstract contract Carnivore is Animal {
    string constant MEAT = "meat";
    modifier eatOnlyMeat(string memory food) {
        require(StringComparer.compare(food, MEAT), "Can Eat only meat");
        _;
    }

    function eat(string memory food)
        public
        pure
        virtual
        override
        eatOnlyMeat(food)
        returns (string memory)
    {
        return super.eat(food);
    }
}

contract Cow is Herbivore, HasName {
    constructor(string memory name) HasName(name) {}

    function speak() public pure override returns (string memory) {
        return "Moooooooooooo";
    }
}

contract Horse is Herbivore, HasName {
    constructor(string memory name) HasName(name) {}

    function speak() public pure override returns (string memory) {
        return "Igo-go";
    }
}

contract Wolf is Carnivore {
    function speak() public pure override returns (string memory) {
        return "Awoo";
    }
}

contract Dog is Carnivore, Herbivore, HasName {
    constructor(string memory name) HasName(name) {}

    function eat(string memory food)
        public
        pure
        override(Carnivore, Herbivore)
        returns (string memory)
    {
        require(!StringComparer.compare(food, "chocolate"));
        return string.concat(string.concat(food, " Nom-nom"));
    }

    function speak() public pure override returns (string memory) {
        return "Woof";
    }
}

contract Farmer {
    function feed(address animal, string memory food)
        public
        pure
        returns (string memory)
    {
        return Animal(animal).eat(food);
    }

    function call(address animal) public pure returns (string memory) {
        return Animal(animal).speak();
    }
}
