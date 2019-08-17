package chapter_io.practise_1.sample_1;

import java.io.File;
import java.io.FileFilter;
import java.io.FilenameFilter;
import java.util.Arrays;

/**
 * 目录过滤
 * Created by wislie on 2018/12/7
 */
public class DirList {

    public static void main(String[] args) {

        DirFilter dirFilter = new DirFilter(".*(.java)$");

        //工程路径
        String projectPath = System.getProperty("user.dir");
        //包路径
        String packagePath = DirList.class.getPackage().getName().replaceAll("\\.", File.separator);
        //文件路径
        String dirPath = projectPath + File.separator + "src" + File.separator + packagePath;
        //  /Users/wislie/Downloads/android/06/Java/java-/src/chapter_io/practise_1/sample_1

        File dir = new File(dirPath);
        String[] fileList = dir.list();

        if (fileList.length != 0) {
            fileList = dir.list(dirFilter);
            dir.list(new FilenameFilter() {
                @Override
                public boolean accept(File dir, String name) {
//                    System.out.println("dir:"+dir.getName()+" name:"+name);
                    return false;
                }
            });
            dir.listFiles(new FileFilter() {
                @Override
                public boolean accept(File pathname) {
//                    System.out.println("pathname:"+pathname);
                    return false;
                }
            });
        }

        Arrays.sort(fileList, String.CASE_INSENSITIVE_ORDER); //然后循环判断两个字符串的第一个字符的ASCII码大小，做出递增排序
//        Arrays.sort(fileList);
        System.out.println(Arrays.toString(fileList));
        //[DirFilter.java, DirList.java]
    }
}
