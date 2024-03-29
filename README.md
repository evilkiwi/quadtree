<div align="center">
  <a href="https://www.npmjs.com/package/@evilkiwi/quadtree" target="_blank">
    <img src="https://img.shields.io/npm/v/@evilkiwi/quadtree?style=flat-square" alt="NPM" />
  </a>
  <a href="https://discord.gg/3S6AKZ2GR9" target="_blank">
    <img src="https://img.shields.io/discord/1000565079789535324?color=7289DA&label=discord&logo=discord&logoColor=FFFFFF&style=flat-square" alt="Discord" />
  </a>
  <img src="https://img.shields.io/npm/l/@evilkiwi/quadtree?style=flat-square" alt="GPL-3.0-only" />
  <h3>Quadtree</h3>
</div>

A quadtree is a method of splitting a game world in to separate nodes in order to increase the performance of collision-based operations.

## Installation

This package is available via NPM:

```bash
yarn add @evilkiwi/quadtree

# or

npm install @evilkiwi/quadtree
```

## Usage

TODO:

## Explanation

A regular way of checking collisions in a game would be getting `ObjectA` and checking it's position against every other Object/Entity in my
game, and then doing the same for every other Object/Entity. This is minimal with a smaller amount of entities, but isn't scalable. And
whilst you _can_ optimise this somewhat, it fundamentally cannot scale. This method is called the `n^2` method, as if you have 100
Object/Entities, you'll need to do 100^2 checks to run the collision logic (10,000 checks).

The idea behind a Quadtree in Game Development is to get around this by having spacial awareness. For example, if I'm checking collisions
for `ObjectA`, I only need to check the other Entities/Objects that are around it - there's no point checking for collision against an
Entity that's on the other side of the game world. You could do something similar to this in the `n^2` method by looping over every single
Object/Entity, checking whether its position is close to `ObjectA` and only then running collision logic on it, but this is still
fundamentally unscalable as you are still doing _some_ level of logic on _every_ Object/Entity in the game world, hence the performance
bottlenecks of `n^2` still apply.

A Quadtree does this by taking Objects that you supply it (In Game Dev, these would be Entities), and then subdividing the game world in to
quads based on how many Objects are in a given area. For example, see this image:

![Example 1](https://i.imgur.com/AlY7vtN.png)

The blue lines show the quads that were generated by the quadtree after inserting the red objects (Entities).

For more information on Quadtrees and how they work, check out this video: [What are Quadtrees](https://www.youtube.com/watch?v=-OLQlDHCMgM)

## To-do

- Add a test suite
