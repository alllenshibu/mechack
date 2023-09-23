import fetch from "node-fetch";

async function query(data) {
    const response = await fetch(
        "https://huggingface.co/sileod/mdeberta-v3-base-tasksource-nli",
        {
            headers: { Authorization: `Bearer ${HF_API_TOKEN}` },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}
query("Can you please let us know more details about your ").then((response) => {
    console.log(JSON.stringify(response));
});
// [{"generated_text":"Can you please let us know more details about your ids as a subscriber or other related project? Be sure to update your username and password or it will be stolen via email. Our information is only accessible through our website, and the payment support services"}]