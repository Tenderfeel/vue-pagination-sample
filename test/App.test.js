/* global describe, test, expect */
import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";

describe("App", () => {
  test("1ページ目のリストが表示される", () => {
    const wrapper = shallowMount(App);
    const items = new Array(100).fill(null).map((e, i) => `Item ${i + 1}`);
    const perPage = 5;

    wrapper.setData({
      items,
      page: 1,
      perPage,
      totalPage: Math.ceil(items.length / perPage),
      count: items.length
    });
    const lists = wrapper.findAll("ol > li");
    expect(lists.length).toBe(5);
    expect(lists.at(0).text()).toBe("Item 1");
    expect(lists.at(4).text()).toBe("Item 5");
  });

  test("最後のページのリストが表示される", () => {
    const wrapper = shallowMount(App);
    const items = new Array(54).fill(null).map((e, i) => `Item ${i + 1}`);
    const perPage = 10;
    const totalPage = Math.ceil(items.length / perPage);
    const page = totalPage;
    const count = items.length;

    wrapper.setData({
      items,
      page,
      perPage,
      totalPage,
      count
    });
    const lists = wrapper.findAll("ol > li");
    expect(lists.length).toBe(4);
    expect(lists.at(0).text()).toBe("Item 51");
    expect(lists.at(3).text()).toBe("Item 54");
  });

  test("ページネーションコンポーネントがある", () => {
    const wrapper = shallowMount(App);
    expect(wrapper.contains({ ref: "pagination" })).toBe(true);
  });

  test("ページネーションにpageとtotalPageが渡される", () => {
    const wrapper = shallowMount(App);
    wrapper.setData({
      page: 10,
      totalPage: 15
    });
    const pagination = wrapper.find({ ref: "pagination" });
    //PrevNextに渡されたpageは10です
    expect(pagination.props().page).toBe(10);
    //PrevNextに渡されたtotalPageは5です
    expect(pagination.props().totalPage).toBe(15);
  });

  test("1ページ目のchangeイベントで2ページ目が表示される", () => {
    const wrapper = shallowMount(App);
    const items = new Array(100).fill(null).map((e, i) => `Item ${i + 1}`);
    const perPage = 10;
    const page = 1;

    wrapper.setData({
      items,
      page,
      perPage,
      totalPage: Math.ceil(items.length / perPage),
      count: items.length
    });

    //PrevNextがあります
    expect(wrapper.contains({ ref: "pagination" })).toBe(true);

    //PrevNextからchangeイベントが発火したことにする
    wrapper.find({ ref: "pagination" }).vm.$emit("change", 2);

    const lists = wrapper.findAll("ol > li");
    //ol > li がperPage個ある
    expect(lists.length).toBe(perPage);
    //ol > li:first-child のテキストは Item 11である
    expect(lists.at(0).text()).toBe("Item 11");
    //ol > li:last-child のテキストは Item 20である
    expect(lists.at(9).text()).toBe("Item 20");

    const pagination = wrapper.find({ ref: "pagination" });
    //PrevNextに渡されたpageは2です
    expect(pagination.props().page).toBe(2);
  });
});
