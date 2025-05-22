import re

def extract_main_styles(css_path, selector):
    with open('test.css', "r", encoding="utf-8") as file:
        css = file.read()

    # Match only the main selector block (no :hover, ::before, etc.)
    pattern = re.compile(
        rf'(?<![:]){re.escape(selector)}\s*\{{([^}}]*)\}}',
        re.MULTILINE
    )

    match = pattern.search(css)
    if not match:
        return None

    # Get the style block and split into property-value pairs
    style_block = match.group(1).strip()
    style_dict = {}

    for line in style_block.split(';'):
        if ':' in line:
            key, value = line.split(':', 1)
            style_dict[key.strip()] = value.strip()

    return style_dict

styles = extract_main_styles("style.css", ".container")
