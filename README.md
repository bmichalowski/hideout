# Hideout

## General info

Game about guards and thieves. Started during christmass break 2019, with ASCII as a graphic layer.

## Technologies

Project is created with:

- JS es5 / es6
- without external dependencies (so far)

## How to run

To run this game:

```
$ cd ../hideout
$ node index.js <map_name>
```

## Dev Tasks

### Watch

Watch task is used for making a preview while editing the map.

```
$ cd ../hideout
$ node runTask watch
```

Then edit any map file end save it - preview will appear.

## Planned stages of creation

In progress:

- map with all objects and characters

Future:

- character control - movement, interaction with doors, containers, dropping and lifting objects
- guards searching the rooms
- memorizing player's achievements between missions and building wealth / reputation
- the ability to spend money on information about the purpose of burglary or bribing the service - e.g. view from several windows available before entering the house or the key left on the shelf.
- skills e.g. lockpicking
- fog of war
- introducing needs for npc, so that guards change their routes, e.g. because of hunger
- introducing character traits to increase their diversity, e.g. laziness, caution, aggression, drunkenness
- map editor, creating homes for thieves themselves
  to allow competition
- introduction of online gaming options
- co-op mode
- ai guards
