import{test, expect, Locator} from "@playwright/test";
test("Verify dropdwon contains duplicates",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const dropDownOption:Locator= page.locator("#color>option");
    //const dropDownOption:Locator= page.locator("#animal>option");
    const optionText:string[]=(await dropDownOption.allTextContents()).map(text=>text.trim());
    const myset= new Set<string>(); //set - duplicates not allowed
    const duplicates:string[]=[];    // array - duplicates allowed
    for(const text of optionText){
        if(myset.has(text)){
            duplicates.push(text);
        }else{
            myset.add(text);
        }
    }
    if(duplicates.length>0){
        console.log("Duplicates options found",duplicates)
    }else{
        console.log("No Duplicates found");
    }

})