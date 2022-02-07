<template>
    <div class="tile" 
    :style="{color, backgroundColor}" 
    @click="reveal"
    @click.right.prevent="flag">
        {{ content }}
    </div>
</template>

<script>
export default {
  name: 'Tile',
  props: {
      tile: Object,
  },
  methods: {
      reveal() {
          this.$emit("reveal");
      },
      flag(){
          this.tile.flagged = !this.tile.flagged;
      },
  },
  computed: {
      content() {
          if (this.tile.flagged) return "🚩";
          if (!this.tile.revealed) return "";
          if (this.tile.bomb) return "💣"; 
          if (this.tile.surrounding_bombs) return this.tile.surrounding_bombs;
          return "";
      },
      color() {
           if (this.tile.surrounding_bombs == 1) return "blue";
           if (this.tile.surrounding_bombs == 2) return "green";
           if (this.tile.surrounding_bombs == 3) return "red";
           if (this.tile.surrounding_bombs == 4) return "purple";
           if (this.tile.surrounding_bombs == 5) return "brown";
           if (this.tile.surrounding_bombs == 6) return "turquoise";
           if (this.tile.surrounding_bombs == 7) return "black";
           return "gray";
      },
      backgroundColor() {
          if (this.tile.revealed) return "#eee";
          return "white";
      },
  },
}
</script>

<style scoped>
.tile{
    width: 50px;
    height: 50px;
    border: 1px solid lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
