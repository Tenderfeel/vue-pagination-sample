/* global describe, test, expect */
import { mount } from "@vue/test-utils";
import PrevNext from "@/components/pagination/prev-next";

describe("PrevNext", () => {
  test("is a Vue instance", () => {
    const wrapper = mount(PrevNext);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test("pageが1のとき1ページ目のナビが表示される", () => {
    const wrapper = mount(PrevNext, {
      propsData: {
        page: 1,
        totalPage: 10
      }
    });
    // .prev は表示しない
    expect(wrapper.find(".prev").exists()).toBe(false);
    // total は ページ page/totalPage と表示される
    expect(wrapper.find(".total").text()).toBe("ページ 1/10");
    // .next は表示する
    expect(wrapper.find(".next").exists()).toBe(true);
    // .nextのhrefが2ページ目になっている
    expect(wrapper.find(".next").attributes().href).toBe("?page=2");
  });
});
