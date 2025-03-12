import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";
const git = simpleGit();

// Get the date 5 days ago
const date = moment().subtract(5, "days").format();

// Create data object
const data = { date };

// Function to write JSON and commit to Git
const updateGitHistory = async () => {
    try {
        // Write to JSON file
        await jsonfile.writeFile(path, data);
        console.log("✅ Data written to file:", data);

        // Check if we are in a Git repository
        const isRepo = await git.checkIsRepo();
        if (!isRepo) {
            console.error("❌ Error: Not a Git repository!");
            return;
        }

        // Add, commit, and push
        await git.add([path]);
        await git.commit(date, { "--date": date });
        await git.push();

        console.log("✅ Successfully pushed to Git");
    } catch (err) {
        console.error("❌ Error:", err);
    }
};

// Run the function
updateGitHistory();
