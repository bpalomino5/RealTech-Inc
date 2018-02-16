import java.util.*;
import java.io.*;

/**
 * Simple Program to check what recipes have been added.
 * First add the file path to your Recipes.txt to the file global variable.
 * Run through command line or upload to an IDE and run.
 * Program will run in a loop until Case-sensitive 'exit' is typed as input.
 * 
 * @author Daniel Gurrera
 */
public class CheckRecipes 
{
    //Copy-Paste the file path here.
    public static final String file = "";
    
    public static void main(String[] args) throws Exception
    {
        Scanner kb = new Scanner(System.in);
        System.out.print("Copy/Paste the link here or type 'exit': ");
        String link = kb.nextLine();
        
        while (!link.equals("exit"))
        {
            FileReader fr = new FileReader(file);
            BufferedReader br = new BufferedReader(fr);
            String line;
            boolean found = false;
            
            while((line = br.readLine()) != null && !found)
            {
                if(line.equals(link))
                {
                    System.out.println("Recipe has already been used.");
                    found = true;
                }
            }

            if (!found)
                System.out.println("Recipes has not been used.");
            
            br.close();
            System.out.print("Copy/Paste the link here or type 'exit': ");
            link = kb.nextLine();
            found = false;
        }
    }
}