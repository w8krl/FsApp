use('fsApp');

// Assumes you're inside the fsApp database in your MongoDB VS Code extension
db.operatives.find().forEach(function (doc) {
    var expInt = parseInt(doc.experience, 10); // Parse the integer part of the "experience" field
    print("Updating document with _id: " + doc._id);
    print("Old experience: " + doc.experience);
    print("New experience: " + expInt);
    var updateResult = db.operatives.updateOne({ _id: doc._id }, { $set: { experience: expInt } });
    print("Matched " + updateResult.matchedCount + " and modified " + updateResult.modifiedCount + " documents.");
});
