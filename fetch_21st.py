import urllib.request
import json

url = "https://21st.dev/api/mcp"
headers = {
    "Content-Type": "application/json",
    "x-api-key": "21st_sk_7530e588241ccc31b256296a97cfd0e91102b8fdfd4cb66990ac3e7c1b894845"
}

data = {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
        "name": "get_component",
        "arguments": {
            "id": 1507
        }
    }
}

req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers=headers)
try:
    response = urllib.request.urlopen(req)
    res_json = json.loads(response.read().decode('utf-8'))
    if "result" in res_json and "content" in res_json["result"]:
        content = res_json["result"]["content"][0]["text"]
        with open('magnetic_button_code.md', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Success")
    else:
        print("Failed to get content")
except Exception as e:
    print(f"Error: {e}")
