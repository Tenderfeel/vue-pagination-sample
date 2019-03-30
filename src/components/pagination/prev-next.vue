<template>
  <div class="pagination">
    <a
      :href="`?page=${prevPage}`"
      class="prev"
      ref="prev"
      v-if="currentPage > 1"
      @click.prevent="onPrev"
    >&lt; 前へ</a>
    <div class="total" ref="total">ページ {{currentPage}}/{{totalPage}}</div>
    <a
      :href="`?page=${nextPage}`"
      class="next"
      ref="next"
      v-if="currentPage < totalPage"
      @click.prevent="onNext"
    >次へ &gt;</a>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      required: true
    },
    totalPage: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      currentPage: this.page
    };
  },
  computed: {
    prevPage() {
      return Math.max(this.currentPage - 1, 1);
    },
    nextPage() {
      return Math.min(this.currentPage + 1, this.totalPage);
    }
  },
  methods: {
    onPrev() {
      this.currentPage = this.prevPage;
      this.$emit("change", this.currentPage);
    },
    onNext() {
      this.currentPage = this.nextPage;
      this.$emit("change", this.currentPage);
    }
  }
};
</script>

<style scoped>
.pagination {
  text-align: center;
}
.pagination * {
  display: inline;
}
a {
  border: 0;
  background: none;
  font-size: initial;
  cursor: pointer;
  margin: 0 1rem;
}
</style>

