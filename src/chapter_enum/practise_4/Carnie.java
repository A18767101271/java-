package chapter_enum.practise_4;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;
import java.util.Random;

/**
 * 责任链模式
 * Created by wislie on 2019/5/9.
 */
public class Carnie {

    interface Project {
        boolean handle();
    }

    enum WATER implements Project {
        SWIMMING {
            @Override
            public boolean handle() {
                return false;
            }
        },
        DIVING {
            @Override
            public boolean handle() {
                return true;
            }
        },
        BOATING {
            @Override
            public boolean handle() {
                return true;
            }
        };
    }

    enum LAND implements Project {
        JUMPING {
            @Override
            public boolean handle() {
                return false;
            }
        },
        RUNNING {
            @Override
            public boolean handle() {
                return true;
            }
        },
        SHOTTING {
            @Override
            public boolean handle() {
                return true;
            }
        },
        BOXING {
            @Override
            public boolean handle() {
                return true;
            }
        }
    }

    enum SKY implements Project {
        FLYING {
            @Override
            public boolean handle() {
                return false;
            }
        },
        BALE {
            @Override
            public boolean handle() {
                return true;
            }
        };

    }

    private static <T extends Enum<T>> T random(Class<T> kind) {
        Random rd = new Random();
        T[] enums = kind.getEnumConstants();
        T t = enums[rd.nextInt(enums.length)];
        return t;
    }

    public static void main(String[] args) {

        List<Project> projects = new ArrayList<>();
        projects.add(random(WATER.class));
        projects.add(random(LAND.class));
        projects.add(random(SKY.class));

        for (Project project : projects) {
            if (!project.handle()) {
                continue;
            }
            System.out.println(project);//BALE
            break;
        }

    }
}
