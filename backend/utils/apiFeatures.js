class APIFeatures {
    
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {

            

            
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }


            // $or: [
                // { name: { $regex: new RegExp(this.queryStr.keyword, 'i') } },
                // { division: { $regex: new RegExp(this.queryStr.keyword, 'i') } },
                // { district: { $regex: new RegExp(this.queryStr.keyword, 'i') } },
                // { thana: { $regex: new RegExp(this.queryStr.keyword, 'i') } },
                // { municipality: { $regex: new RegExp(this.queryStr.keyword, 'i') } },
                // { ward: { $regex: new RegExp(this.queryStr.keyword, 'i') } },
                // { village: { $regex: new RegExp(this.queryStr.keyword, 'i') } },
                // { condition: { $regex: new RegExp(this.queryStr.keyword, 'i') } },
            //   ]

            
        } : {}
        console.log(keyword);
        this.query = this.query.find({ ...keyword });
        return this;
    }
    
    filter() {
        const queryCopy = { ...this.queryStr };
        

        //Removing fields from the qurey
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(el => delete queryCopy[el]);

         console.log(queryCopy);
        //Advance filter for price, ratings etc
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        console.log(queryStr);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}
module.exports = APIFeatures;   