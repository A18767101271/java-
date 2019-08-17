package chapter_io.practise_5.sample_2;

import java.util.prefs.Preferences;

/**
 * 和android中的Preferences差别挺大
 * Created by wislie on 2018/12/21.
 */
public class PreferenceTest {

    public static void main(String[] args) {

        Preferences prefs = Preferences.systemNodeForPackage(PreferenceTest.class);
        prefs.put("name","wislie");
        prefs.putBoolean("is_continue",false);
        prefs.putInt("age",10);

        System.out.println(prefs.get("name",""));
        System.out.println(prefs.get("is_continue",""));
        System.out.println(prefs.get("age",""));
    }
}
