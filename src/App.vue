<template>
  <div id="app">
    <div>
    <header>
      <div>{{ bombsRemaining }}</div>
      <button @click="reset">{{ gameStatus }}</button>
      <Timer :gameInProgress="gameInProgress" />
    </header>
    <div class="board">
      <Tile v-for="(tile, index) in tiles" :key="index" :tile="tile" @reveal="reveal(index)"/>
    </div>
    </div>
  </div>
</template>

<script>
import Tile from './components/Tile.vue';
import Timer from './components/Timer.vue';
import { generateTiles, getCoordinates, getIndex, total_bombs } from "./utils";

export default {
  name: 'App',
  components: {
    Tile,
    Timer,
  },
  data: function() {
    return {
      tiles: generateTiles(),
    };
  },
  methods: {
    reset() {
      this.tiles = generateTiles();
    },
    reveal(index){
      if (index == undefined) return;

      const tile = this.tiles[index];

      if (!tile.revealed) {
        tile.revealed = true;
        if (!tile.bomb && tile.surrounding_bombs == 0){
          const { row, column } = getCoordinates(index);

          this.reveal(getIndex(row - 1, column - 1));
          this.reveal(getIndex(row - 1, column - 0));
          this.reveal(getIndex(row - 1, column + 1));
          this.reveal(getIndex(row - 0, column - 1));
          this.reveal(getIndex(row - 0, column + 1));
          this.reveal(getIndex(row + 1, column - 1));
          this.reveal(getIndex(row + 1, column - 0));
          this.reveal(getIndex(row + 1, column + 1));
          
        }
      }
    },
  },
  computed: {
    bombsRemaining(){
      const total_flags = this.tiles.filter(tile => tile.flagged).length;
      return total_bombs - total_flags;
    },
    gameOver(){
      return this.tiles.find(tile => tile.bomb && tile.revealed)
    },
    gameWon(){
      const tiles_revealed = this.tiles.filter(tile => tile.revealed).length;
      return tiles_revealed + total_bombs == 100;
    },
    gameStatus() {
      if (this.gameOver) return "😞";
      if (this.gameWon) return "🤩";
      return "😊";
    },
    gameInProgress() {
      if (this.gameWon || this.gameOver) return false;
      if (this.tiles.find(tile => tile.revealed)) return true;
      return false;
    },
  }
}
</script>

<style>
#app {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family:'Courier New', Courier, monospace;
  font-weight: 700;
}
.board{
  display: grid;
  grid-template-rows: repeat(10, auto);
  grid-template-columns: repeat(10, auto);
}
header{
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  font-size: 2em;
}
button{
  font-size: inherit;
}
</style>
