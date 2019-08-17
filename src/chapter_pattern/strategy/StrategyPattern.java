package chapter_pattern.strategy;

import java.io.File;
import java.io.FilenameFilter;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

/**
 * 策略模式
 * Context(应用场景):
 * 1、需要使用ConcreteStrategy提供的算法。
 * 2、内部维护一个Strategy的实例。
 * 3、负责动态设置运行时Strategy具体的实现算法。
 * 4、负责跟Strategy之间的交互和数据传递。
 * Created by wislie on 2018/8/30.
 */
public class StrategyPattern {

    /**
     * 创建策略
     * <p>
     * 根据路程判断交通方式
     *
     * @return
     */
/*    private TravelStrategy createTravelStrategy(long kiloMeters) {
        if (kiloMeters > 300) {
            return new TrainStrategy();
        } else if (kiloMeters > 100) {
            return new CarStrategy();
        } else if (kiloMeters > 8) {
            return new BicycleStrategy();
        }
        return new WalkStrategy();

    }*/


//////////////////通过注解的方式去获得TravelStrategy对象////////////////////



    private List<Class<? extends TravelStrategy>> clazzList = new ArrayList<>();

    public StrategyPattern() {
        ClassLoader classLoader = getClass().getClassLoader();
        String packageName = getClass().getPackage().getName();
        File[] listFiles = listFiles(classLoader, packageName);
        if (listFiles != null && listFiles.length != 0) {
            try {
                for (File file : listFiles) {
                    //如 chapter_pattern.strategy.StrategyPattern$WalkStrategy
                    String name = packageName + "." + file.getName().replace(".class", "");
                    Class cls = classLoader.loadClass(name);
                    clazzList.add(cls);
                }
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            }
        }
    }


    //处理注解
    private TravelStrategy createTravelStrategy(long kiloMeters) {

        try {
            for (Class<? extends TravelStrategy> cls : clazzList) {
                boolean hasAnnotation = cls.isAnnotationPresent(TravelDistance.class);

                if (hasAnnotation) {
                    TravelDistance annotation = cls.getAnnotation(TravelDistance.class);
                    if (kiloMeters < annotation.max() && kiloMeters >= annotation.min()) {
                        return  cls.newInstance();
                    }

                }
            }
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }

        return null;

    }

    private File[] listFiles(ClassLoader classLoader, String packageName) {
        //获取当前类的class列表

        File file = null;
        try {
            String name = packageName.replace(".", "/");
            URI uri = classLoader.getResource(name).toURI();

            file = new File(uri);

        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        if (file.exists()) {

            File[] listFiles = file.listFiles(new FilenameFilter() {
                @Override
                public boolean accept(File dir, String name) {
                    if (name.endsWith(".class")) return true;
                    return false;
                }
            });
            return listFiles;
        }
        return null;
    }

    /**
     * 开始旅行
     *
     * @param kiloMeters
     */
    private void startTravel(long kiloMeters) {
        TravelStrategy strategy = createTravelStrategy(kiloMeters);
        if (strategy != null) {
            strategy.travel();
        }

    }

    public static void main(String[] args) {
        StrategyPattern pattern = new StrategyPattern();
        pattern.startTravel(90);

    }
}
