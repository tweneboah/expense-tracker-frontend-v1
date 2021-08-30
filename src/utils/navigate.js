const navigate = (history, path, data) => {
  history.push({
    pathname: `/${path}`,
    state: { data },
  });
};

export default navigate;
