export function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}

function handler(signal, cb) {
  return async function(err) {
    console.log(`${signal}...`);
    if (err) {
      console.error(err.stack || err);
    }

    cb(signal);

    setTimeout(() => {
      process.exit(err ? 1 : 0);
    }, 500).unref();
  };
}

export function shutdown(cb) {
  process
    .on("SIGTERM", handler("SIGTERM", cb))
    .on("SIGINT", handler("SIGINT", cb))
    .on("uncaughtException", handler("uncaughtException", cb));
}
