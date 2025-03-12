import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";
const date = moment().subtract(5, "days").format();

const data = { date: date };

// Write to JSON file
jsonfile.writeFile(path, data, (err) => {
    if (err) {
        console.error("Error writing file:", err);
        return;
    }

    // Initialize Git and perform commit/push
    const git = simpleGit();
    git.add([path])
        .commit(date, { "--date": date })
        .push()
        .then(() => console.log("Successfully pushed to Git"))
        .catch((err) => console.error("Git error:", err));
});
