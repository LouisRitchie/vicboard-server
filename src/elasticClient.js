import { Client as elasticClient } from 'elasticsearch'
import config from './config'

const host = config.elasticsearch.host //`http://${config.elasticsearch.username}:${config.elasticsearch.password}@${config.elasticsearch.host}`

export default class elasticSearchAbstraction extends elasticClient {
    constructor() {
        super({ host })

        this.check()
            .then(() => {
                console.log(`Established Connection to ElasticSearch @ ${host}`)


                this.initIndexs()


            })
            .catch(error => console.error(`Elastic Search is DOWNNNNNNN`, error))
    }

    check = () => new Promise((resolve, reject) => this.ping({
        requestTimeout: 30000,
        hello: "elasticsearch"
    }, error => error ? reject(error) : resolve()));

    getThread(id, type) {

        this.get({
            index: 'thread',
            type,
            id
        }, (error, response) => {
            console.log(error, response)

        })


    }


    initIndexs = (overwrite = false) => {
        const indexs = ['thread', 'comments']

        indexs.forEach(index => {
            console.log(index)
            this.indices.exists({}, (err, exsists) => {

            })

        })


    };
}
