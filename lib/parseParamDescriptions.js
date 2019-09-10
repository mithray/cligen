function parseParamDescriptions(descriptions) {
    //    console.log(descriptions)
    let param_arr = []
    param_arr.push(descriptions)
    descriptions = param_arr.flat()
    descriptions = descriptions.filter(Boolean)
    //  console.log(descriptions)
    let desc_arr = []
    for (let desc in descriptions) {
        desc = descriptions[desc]
        //console.log(desc)
        let desc_obj = {
            type: desc.replace(/.*{(.*?)}.*/, '$1').trim(),
            name: desc.replace(/.*\[(.*?)=(.*)\].*/, '$1').trim(),
            default: desc.includes('=')
                ? desc
                      .replace(/.*\[.*=\s*['"]*([^'"]*)['"]*\s*\].*/, '$1')
                      .trim()
                : ''
        }
        //        console.log(desc_obj)
        desc_arr.push(desc_obj)
    }

    return desc_arr
}

module.exports = parseParamDescriptions
