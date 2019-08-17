package chapter_io.practise_1.sample_1;

import java.io.File;
import java.io.FilenameFilter;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 目录过滤器
 * Created by wislie on 2018/12/7.
 */
public class DirFilter implements FilenameFilter {

    private Pattern pattern;

    public DirFilter(String regex) {
        pattern = Pattern.compile(regex);
    }

    @Override
    public boolean accept(File dir, String name) {
        Matcher matcher = pattern.matcher(new File(name).getName());
        return matcher.matches();
    }
}
