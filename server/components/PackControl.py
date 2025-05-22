from components.smalloperations.help_fun import Make_Id
from components.database.MySqlDB import DataBase
from pathlib import Path
import re
import mysql.connector

mydb = DataBase()
mycursor=mydb.cursor()

def CreateLibrary(data):
    randomid=Make_Id()
    try:
        sql = "insert into StorePack(_packid,cdn,name,description,visibility,packType,userid) values(%s,%s,%s,%s,%s,%s,%s);"
        val=(randomid,data["url"],data["name"],data["description"],data['visibility'],data['packType'],data['userid'])
        mycursor.execute(sql, val)
        mydb.commit()
        if(data['packType']=='CSS'):
            open("packs/"+data['username']+"/"+data['name']+".css",'x')
        return {'message':"Created new pack",'status':True}
    except mysql.connector as err:
        # print(f"Error: {err}")
        return {'message':"Some Server Erorr",'status':False}
    

def CollectPack(data):
 try:
    sql='select * from StorePack where userid=%s'
    userid=(data,)
    mycursor.execute(sql,userid)
    result = mycursor.fetchall()
    arrange=[]
    for x in range(len(result)):
        arrange.append({
            '_packid':result[x][0],
            'cdn':result[x][1],
            'name':result[x][2],
            'description':result[x][3],
            'visibility':result[x][4],
            'packtype':result[x][5]
        })
    return arrange
 except mysql.connector as err:
    return {'message':"Some Server Erorr",'status':False}

def LibComponents(data):
    filepath=data['cdn']+data['name']+'.'+data['packtype']
    with open(filepath, "r", encoding="utf-8") as file:
        css_content = file.read()

    # Match selectors only at the start of a CSS rule (before `{`)
    selector_blocks = re.findall(r'([^\{\}]+)\{', css_content)

    class_names = set()
    id_names = set()

    for block in selector_blocks:
        selectors = block.split(',')
        for selector in selectors:
            selector = selector.strip()
        
            # Add `.` prefix to each class match
        for match in re.findall(r'\.([a-zA-Z_][a-zA-Z0-9_-]*)', selector):
            class_names.add(f".{match}")
        
        # Add `#` prefix to each ID match
        for match in re.findall(r'\#([a-zA-Z_][a-zA-Z0-9_-]*)', selector):
            id_names.add(f"#{match}")
    return [list(class_names),list(id_names)]

def setpacktolibrary(data):
    # Path to your CSS file
    css_path =f"{data['libdata']['cdn']}{data['libdata']['name']}.{data['libdata']['packtype']}"

    # Your full new content (including pseudo-selectors)
    new_content = data['style']

    # Read the current CSS
    with open(css_path, "r", encoding="utf-8") as file:    
        css = file.read()

    # Step 1: Extract base selectors like `.container` or `#header`
    base_selectors = set()
    for match in re.finditer(r'([.#][a-zA-Z_][\w\-]*)', new_content):
        base = match.group(1)
        base_selectors.add(base)

    # Step 2: Remove all related selector blocks
    for base in base_selectors:
        # Match any variant like .container, .container:hover, .container::after, etc.
        pattern = re.compile(rf'\s*{re.escape(base)}[^\{{]*\{{[^}}]*\}}\s*', re.MULTILINE)
        css = pattern.sub('', css)

    # Step 3: Remove extra blank lines (more than one in a row)
    css = re.sub(r'\n\s*\n+', '\n\n', css)

    # Step 4: Append new content cleanly
    css = css.strip() + "\n\n" + new_content.strip() + "\n"

    # Step 5: Write it back
    with open(css_path, "w", encoding="utf-8") as file:
         file.write(css)

    return {'status':True}

def collectstyle(data):

    # Target selector (e.g. ".container", "#main")
    target_selector = data['selector']
    css_path =f"{data['libdata']['cdn']}{data['libdata']['name']}.{data['libdata']['packtype']}"
    # Read the CSS file
    with open(css_path, "r", encoding="utf-8") as file:
        css = file.read()

    # Match only the main selector block (no :hover, ::before, etc.)
    pattern = re.compile(
        rf'(?<![:]){re.escape(target_selector)}\s*\{{([^}}]*)\}}',
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


