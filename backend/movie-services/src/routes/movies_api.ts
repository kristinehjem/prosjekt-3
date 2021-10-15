// (app) => {
//     console.log("movesApi created");
    
//     app.get(`/api/`, async (req: any, res: any) => {
//         const URL = "https://imdb-api.com/en/API/250Movies"
//         const API_KEY = "k_o72ahudx"
//         try {
//             const movies = await fetch(URL, {
//                 headers: new Headers({
//                     apiKey: API_KEY,    
//                 })
//             })
//         } catch (err) {
//             console.log(err);
            
//         }
//     })
// }
