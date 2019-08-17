package chapter_io.practise_1.sample_2;


import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by wislie on 2018/12/7.
 */
public class Directory {

    //目录文件集
    private static List<File> mDirList = new ArrayList<>();
    //非目录文件集
    private static List<File> mFileList = new ArrayList<>();

    //获取文件集
    private static void local(File file, String regex) {
        recurseDirs(file, regex);
    }

    private static void local(String path, String regex) {
        local(new File(path), regex);
    }


    private static void recurseDirs(File file, String regex) {

        if (file.isDirectory()) { //如果文件是目录文件
            mDirList.add(file);
            File[] files = file.listFiles();
            for (File f : files) {
                recurseDirs(f, regex);
            }
        } else { //如果文件不是目录文件

            if(file.getName().matches(regex)){
                mFileList.add(file);
            }
        }
    }

    //获取当前目录
    public static File getCurrentDirectory(Class cls){
        //工程路径
        String projectPath = System.getProperty("user.dir");
        //包路径
        String packagePath = cls.getPackage().getName().
                replaceAll("\\.", File.separator);
        //文件路径
        String dirPath = projectPath + File.separator + "src" + File.separator + packagePath;
        return new File(dirPath);
    }


    public static void main(String[] args) {

        File dir = getCurrentDirectory(Directory.class).getParentFile().getParentFile();
        recurseDirs(dir,".*java");
        System.out.println(mDirList);
        System.out.println(mFileList);
    }
}
