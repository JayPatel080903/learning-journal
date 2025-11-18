import json
from datetime import datetime
import os

# Define the filename
FILE_PATH = 'reflections.json'

def save_reflection_entry():
    """
    Prompts the user for a reflection and saves it to the JSON file.
    """
    print("-" * 40)
    print("Reflection Entry Tool")
    print("-" * 40)

    # 1. Get reflection text from the user
    user_input = input("Type your reflection entry here: \n> ")

    if not user_input.strip():
        print("\nReflection cannot be empty. Aborting save.")
        return

    # 2. Prepare the new entry object
    new_entry = {
        "id": datetime.now().strftime("%Y%m%d%H%M%S"),
        "timestamp": datetime.now().isoformat(),
        "reflection": user_input.strip()
    }

    # 3. Read existing data
    data = []
    if os.path.exists(FILE_PATH):
        try:
            with open(FILE_PATH, 'r', encoding='utf-8') as f:
                content = f.read().strip()
                if content:
                    data = json.loads(content)
        except json.JSONDecodeError:
            print(f"Warning: Existing {FILE_PATH} is corrupted or empty. Starting new list.")
        except Exception as e:
            print(f"An error occurred reading the file: {e}")

    # 4. Append the new entry
    data.append(new_entry)

    # 5. Write the updated data back to the file
    try:
        with open(FILE_PATH, 'w', encoding='utf-8') as f:
            # Use indent for readability
            json.dump(data, f, indent=4)
        print("\nSuccessfully saved reflection entry:")
        print(f"  > ID: {new_entry['id']}")
        print(f"  > Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("-" * 40)

    except Exception as e:
        print(f"An error occurred writing to the file: {e}")

if __name__ == "__main__":
    save_reflection_entry()