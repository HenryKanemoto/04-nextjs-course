const TOKEN = process.env.DATO_TOKEN

//Função para retornar o data da API do DATOCMS, utilizando o query dado para buscar pelo GraphQl do DATOCMS, com o Token de leitura da API 'TOKEN'
export async function cmsService({
    query
}) {

    try {
        const PageContentData = await fetch('https://graphql.datocms.com/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + TOKEN,
            },
            body: JSON.stringify({
                query
            })
        })
            .then(async (resposta) => {
                const body = await resposta.json()
                if(!body.errors) return body;

                throw new Error(JSON.stringify(body));
            })
    
        return {
            data: PageContentData.data
        }
    } catch (error) {
        throw new Error(error.message);
    }

}