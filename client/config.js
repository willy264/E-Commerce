const checkConfig=(server) => {
  let config = {}
  switch (server) {
    case 'production':
      config = {
        baseUrl: "https://e-commerce-eight-theta-27.vercel.app",
        // baseUrl: "https://adminecofashionmart.vercel.app/",
      };
      break;
    case "local":
      config = {
        baseUrl: "http://localhost:8000",
      };
      break;
      default: 
        break;
  } 
  return config
} // checking the configuration


export const selectServer = 'production'
// export const selectServer = 'production'
export const config = checkConfig(selectServer)