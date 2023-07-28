import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import cheerio from 'cheerio';

export interface Phrase {
    text: string,
    author: string,
}

type SingleChar<T extends string> = T extends '' | `${any}${string}${any}` ? 'String must be a single character' : T;

/**
 * @class PensadorClient
 * @description Client for Pensador.com
 */
class PensadorClient {
    private readonly _baseUrl = 'https://www.pensador.com/';
    private readonly _defaultPath = 'frases_curtas';

    private readonly _client = axios.create({
        baseURL: this._baseUrl,
        timeout: 20000,
        validateStatus(status) {
            return status >= 200 && status < 300;
        },
    });

    constructor() {
        this._applyInterceptors();
    }

    private _applyInterceptors() {
        this._client.interceptors.request.use( (request: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
            // console.log(`Request: ${request.baseURL}${request.url}`)
            return request;
        });

        this._client.interceptors.response.use( (response: AxiosResponse): AxiosResponse => {
            // console.log(`Response: ${response.status} - ${response.statusText}`)
            return response;
        }
        , (error: any) => {
            // console.log(`Error: ${error.message}`)
            return Promise.reject(error);
        });
    }

    private _getPhraseFromPage(page:string) : Phrase[] {
        const $ = cheerio.load( page );
        const phrases: Phrase[] = [];

        $(".thought-card").each(function(i, element) {
            phrases.push({
              author: $(element)
                .find("a")
                .first()
                .text()
                .replace(/\n/g, ""),
              text: $(element)
                .find("p")
                .first()
                .text()
                .replace(/\n/g, "")
            });
          });

        return phrases;
    }

    private _getAuthors(page:string) : string[] {
        const $ = cheerio.load( page );
        const authors: string[] = [];

        $(".custom-list").children().each(function(i, element) {
            authors.push($(element)
                .find("a")
                .first()
                .text()
                .replace(/\n/g, ""));
          });

        return authors;
    }

    /**
     * @async
     * @description Get short phrases from Pensador.com
     * @returns {Promise<Phrase[]>} Array of phrases
     */
    public async getShortPhrases(): Promise<Phrase[]> {
        
        const { data } = await this._client.get<string>(this._defaultPath);
        return this._getPhraseFromPage(data);
    }

    /**
     * @async
     * @description Get phrases from an specific author from Pensador.com
     * @param {string} author Author name
     * @returns {Promise<Phrase[]>} Array of phrases
     */
    public async getPhrasesByAuthor(author: string): Promise<Phrase[]> {

        const { data } = await this._client.get<string>(`frases_de_${author.toLowerCase().replaceAll(' ', '_')}`);
        return this._getPhraseFromPage(data);
    }

    /**
     * @async
     * @description Get recent phrases from Pensador.com
     * @returns {Promise<Phrase[]>} Array of phrases
     */
    public async getRecentPhrases(): Promise<Phrase[]> {

        const { data } = await this._client.get<string>("recentes");
        return this._getPhraseFromPage(data);
    }

    /**
     * @async
     * @description Get popular phrases from Pensador.com
     * @returns {Promise<Phrase[]>} Array of phrases
     */
    public async getPopularPhrases(): Promise<Phrase[]> {

        const { data } = await this._client.get<string>("populares");
        return this._getPhraseFromPage(data);
    }

    /**
     * @async
     * @description Get popular authors from Pensador.com
     * @returns {Promise<string[]>} Array of authors
     */
    public async getPopularAuthors(): Promise<string[]> {

        const { data } = await this._client.get<string>("autores");
        return this._getAuthors(data);
    }

    /**
     * @async
     * @description Get authors that starts with character from Pensador.com
     * @returns {Promise<string[]>} Array of authors
     */
    public async getAuthorsStartingWith<T extends string>( firstLetterOfName: SingleChar<T> ): Promise<string[]> {

        if (firstLetterOfName.length > 1) throw new Error('First letter of name must be a single character');
        const { data } = await this._client.get<string>(`autores/${firstLetterOfName.toLowerCase()}`);
        return this._getAuthors(data);
    }

}

export default new PensadorClient(); 