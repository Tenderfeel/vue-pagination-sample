/* global describe, test, expect */
import { mount } from "@vue/test-utils";
import PrevNext from "@/components/pagination/prev-next";

describe("PrevNext", () => {
  test("is a Vue instance", () => {
    const wrapper = mount(PrevNext, {
      propsData: {
        page: 1,
        totalPage: 20
      }
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test("pageが1のとき1ページ目のナビが表示される", () => {
    const wrapper = mount(PrevNext, {
      propsData: {
        page: 1,
        totalPage: 20
      }
    });
    // .prev は表示しない
    expect(wrapper.find({ ref: "prev" }).exists()).toBe(false);
    // total は ページ 1/20 と表示される
    expect(wrapper.find({ ref: "total" }).text()).toBe("ページ 1/20");
    // .next は表示する
    expect(wrapper.find({ ref: "next" }).exists()).toBe(true);
    // .nextのhrefが2ページ目になっている
    expect(wrapper.find({ ref: "next" }).attributes().href).toBe("?page=2");
  });

  test("pageがtotalPageと同じとき最終ページ用のナビが表示される", () => {
    const wrapper = mount(PrevNext, {
      propsData: {
        page: 20,
        totalPage: 20
      }
    });
    // .prev は表示する
    expect(wrapper.find({ ref: "prev" }).exists()).toBe(true);
    // .nextのhrefが9ページ目になっている
    expect(wrapper.find({ ref: "prev" }).attributes().href).toBe("?page=19");
    // total は ページ 20/20 と表示される
    expect(wrapper.find({ ref: "total" }).text()).toBe("ページ 20/20");
    // .next は表示しない
    expect(wrapper.find({ ref: "next" }).exists()).toBe(false);
  });

  test(".nextを押したら次のページに移動する", () => {
    const wrapper = mount(PrevNext, {
      propsData: {
        page: 1,
        totalPage: 20
      }
    });

    const next = wrapper.find(".next");
    //.nextをクリックしたら、
    next.trigger("click");
    //.prevが表示される
    expect(wrapper.find({ ref: "prev" }).exists()).toBe(true);
    //.prevのhrefはpage=1である
    expect(wrapper.find({ ref: "prev" }).attributes().href).toBe("?page=1");
    //.totalは ページ 2/20 と表示される
    expect(wrapper.find({ ref: "total" }).text()).toBe("ページ 2/20");
    //.nextはhrefがpage=3となって表示される
    expect(wrapper.find({ ref: "next" }).exists()).toBe(true);
    expect(wrapper.find({ ref: "next" }).attributes().href).toBe("?page=3");
  });

  test(".prevを押したら前のページに移動する", () => {
    const wrapper = mount(PrevNext, {
      propsData: {
        page: 2,
        totalPage: 20
      }
    });

    const prev = wrapper.find({ ref: "prev" });
    //.prevをクリックしたら、
    prev.trigger("click");
    //..prevは表示されない
    expect(wrapper.find({ ref: "prev" }).exists()).toBe(false);
    //.totalは ページ 1/20 と表示される
    expect(wrapper.find({ ref: "total" }).text()).toBe("ページ 1/20");
    //.nextはhrefがpage=2となって表示される
    expect(wrapper.find({ ref: "next" }).exists()).toBe(true);
    expect(wrapper.find({ ref: "next" }).attributes().href).toBe("?page=2");
  });

  test(".prevか.nextを押したらchangeが発火する", () => {
    const wrapper = mount(PrevNext, {
      propsData: {
        page: 2,
        totalPage: 20
      }
    });

    const prev = wrapper.find({ ref: "prev" });
    //.prevをクリックしたら、
    prev.trigger("click");
    //changeイベントが発火する
    expect(wrapper.emitted().change).toBeTruthy();
    //ページ番号は1が渡されます
    expect(wrapper.emitted().change[0]).toEqual([1]);

    const next = wrapper.find({ ref: "next" });
    //.nextをクリックしたら、
    next.trigger("click");
    //changeイベントが発火する
    expect(wrapper.emitted().change).toBeTruthy();
    //ページ番号は2が渡されます
    expect(wrapper.emitted().change[1]).toEqual([2]);
    //2回イベントが発火してるはずです
    expect(wrapper.emitted().change.length).toBe(2);
  });
});
