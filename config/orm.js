// ORM-TOWN USA
// All the database-querying goodies to export for all the convenience not typing out SQL queries can provide

// But first, a little housekeeping-->first a Question Mark then an Object-to-SQL helper functions 
function questionMarkMaker(number) {
    var arr = [];

    for (var i = 0; i < number; i++){
        arr.push("?");
    }

    return arr.toString();
}

// Obj-->SQL
function objToSql(ob) {
    var arr = [];
    // loop to provide the key/value pairs as a string/integer/array, etc
    for (var key in ob) {
        let value = ob[key];
        // No one likes a hidden property; lets skip them
        if (Object.hasOwnProperty.call(ob, key)) {
            // add quotes to strings with spaces; totally reasonable
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            
            arr.push(key + "=" + value);
        }
    }
    // Returns the array of all those strings to a single comma-separated string. Classic.
    return arr.toString();
};

var orm = {
    all: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if (err){
                throw err;
            }
            cb(result);
        });
    },
    create: function(table, columns, values, cb) {
        var queryString = " INSERT INTO " + table;

        queryString += " (";
        queryString += columns.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += questionMarkMaker(values.length);
        queryString += ") ";

        console.log("How we're looking: " + queryString);

        connection.query(queryString, values, function(err, result){
            if (err){
                throw err;
            }

            cb(result);
        });
    },
    update: function(table, objColumnVals, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColumnVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log("How we're looking: " + queryString);
        connection.query(queryStrong, function(err, result){
            if (err){
                throw err;
            }

            cb(result);
        });
    }
};

// Don't forget to set the ORM free-->
module.exports = orm;