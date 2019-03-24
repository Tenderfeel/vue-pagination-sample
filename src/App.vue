<template>
  <div id="app">
    <div class="content">
      <ol>
        <li v-for="(item, i) in filterItems" :key="i">{{item}}</li>
      </ol>
    </div>
    <prev-next :page="page" :totalPage="totalPage" @change="onPageChange"/>
  </div>
</template>

<script>
import PrevNext from "@/components/pagination/prev-next";
export default {
  name: "App",
  components: { PrevNext },
  data() {
    const items = new Array(200).fill(null).map((e, i) => `Item ${i + 1}`);
    const perPage = 10;

    return {
      items, //表示するデータがここに入る
      page: 1, //現在のページ番号
      perPage, //1ページ毎の表示件数
      totalPage: Math.ceil(items.length / perPage), //総ページ数
      count: items.length //itemsの総数
    };
  },
  computed: {
    filterItems() {
      return this.items.filter(
        (item, i) =>
          i >= (this.page - 1) * this.perPage && i < this.page * this.perPage
      );
    }
  },
  methods: {
    onPageChange(page) {
      this.page = page;
      window.history.replaceState(
        { page },
        `Page${page}`,
        `${window.location.origin}/?page=${page}`
      );
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

ol {
  list-style-position: inside;
  padding: 0;
}
ol li {
  border: solid 1px #efefef;
  padding: 0.3rem;
}
ol li + li {
  border-top: 0;
}
</style>
