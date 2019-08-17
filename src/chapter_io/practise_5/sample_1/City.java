package chapter_io.practise_5.sample_1;

/**
 * Created by wislie on 2018/12/20.
 */
public class City {

    private String name;
    private String provinceName;

    public City(String name, String provinceName) {
        this.name = name;
        this.provinceName = provinceName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProvinceName() {
        return provinceName;
    }

    public void setProvinceName(String provinceName) {
        this.provinceName = provinceName;
    }
}
