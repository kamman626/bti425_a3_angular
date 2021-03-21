const apiUrl = 'https://damp-mountain-76760.herokuapp.com/api/sales?page=';

function Load(page = 1) {
    const url = `${apiUrl}${page}&perPage=10`;

    return fetch(url)
        .then(res =>{
            if(!res.ok){
                throw new Error(`API return status code ${res.status}`);
            }
            return res.json();
        })
        .then(results => results)
        .catch(err => {
            console.warn(err);
            return {
                page: 1,
                total_pages: 1,
                data: [],
            };
        })        
}

export default Load;
