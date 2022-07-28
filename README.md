## ASM Space

### Demo Video:

### Try it out now on https://asmspace.xyz

ASM Space is a space shooter game on Ethereum where you can play against enemy ships controlled by ASM Brains!
![](https://asmspace.xyz/assets/screenshots/level-1.png)

We snapshot 17 ASM brains and implemented them in the game to play the enmy ships in the 17 levels of ASM Space. Each ship is controlled by an ASM brain which genome have corresponding ship attributes: speed, armor, rate of fire, etc.
![](https://asmspace.xyz/assets/screenshots/present-brains.png)

You ship is an ERC 721 NFT that can be minted and upgraded on Ethereum. Mint a basic spaceship to start with. Pilot it in the game and fight ASM Brains piloting ships! Harvest their parts. Upgrade your ship. Then sell your upgraded NFT.
![](https://asmspace.xyz/assets/screenshots/present-model.png)

We have created an NFT collection of 256 unique spaceships made of a combination of 4 different cabins, 4 wings, 4 engines, and 4 weapons.
![](https://asmspace.xyz/assets/screenshots/present-parts.png)
![](https://asmspace.xyz/assets/screenshots/present-possibilities.png)

ASM Space is a fully working game and available at https://asmspace.xyz
![](https://asmspace.xyz/assets/screenshots/level-2.png)

Make sure you have installed Metamask and connected it to the `Rinkeby Testnet`. Click "Connect your Wallet". Metamask opens to authorize the connection.
![](https://asmspace.xyz/assets/screenshots/home.png)

The game will then fetch all your spaceship NFTs from the smart contract. If you do not yet have a ASM Spaceship NFT, click "Mint New Ship" and Metamask will open to trigger the mint. You will receive a basic ship with entry-level weapons, wings, engine, and cabin. The ship will appear in your list of ships (if not refresh the page). Select that ship to access the game.
![](https://asmspace.xyz/assets/screenshots/select-ship-2.png)

The game is built with PhaserJS, a 2D Javascript game engine that allows us to pilot our ship and fire at enemies. Use the directional arrows to move the ship and press the space bar to fire. Try to kill the enemy ship, but be careful not to get hit. You have 10 lives then it's game over. When the enemy is destroyed, it drops some loot. Move your ship over it to get it into your inventory.
![](https://asmspace.xyz/assets/screenshots/level-3.png)

Then open your inventory to see all the parts you have found. Drag and drop a ship part to its corresponding area on your ship to upgrade that part. A Ethereum transaction opens that will actually modify your NFT metadata and image on-chain with the new part. You can check Etherscan to verify the transaction.
![](https://asmspace.xyz/assets/screenshots/inventory.png)

Moreover, we have implemented a shop with its own ERC20 currency. Click the shop logo to open the shop. You can sell your parts by dragging them to the shop inventory, a transaction will open and you will earn 1 SpaceCoin per part you sell. On the other hand, you can buy new parts from the shop by dragging them to your inventory. You can then later equip them on your ship.
![](https://asmspace.xyz/assets/screenshots/shop.png)

Finally, once you have destroyed the enemy, you can move to the next area. Click the star icon to open the galaxy map. You can fly your ship to the stars in range. Click the one you want to move to and be ready to fight a harder enemy controlled by a better ASM Brain.
![](https://asmspace.xyz/assets/screenshots/map.png)

Move from one star to another until you reach the boss of the game, an insanely powerful ship with devastating weapons, controlled by the best ASM Brain.
![](https://asmspace.xyz/assets/screenshots/level-4.png)

If you defeat the boss, you win ASM Space!
