module.exports = {
  apps : [{
    name   : "frontend",
    script : "npx",
    interpreter: "none",
    args: "serve -s build"
  }]
}