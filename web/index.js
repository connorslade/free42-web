(async () => {
  let module = await Free42();
  module._init();

  module._keydown(31);
})();
