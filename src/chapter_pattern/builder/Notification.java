package chapter_pattern.builder;

/**
 * Created by wislie on 2019/4/17.
 */
public class Notification {

    private String title;
    private String content;
    private String gravity;
    private int size;
    private int category;


    public Notification(Builder builder) {
        this.title = builder.title;
        this.content = builder.content;
        this.gravity = builder.gravity;
        this.size = builder.size;
        this.category = builder.category;
    }

    static class Builder {

        private String title;
        private String content;
        private String gravity;
        private int size;
        private int category;

        public Builder(String title, String content){
            this.title = title;
            this.content = content;
        }

        public Builder setTitle(String title) {
            this.title = title;
            return this;
        }

        public Builder setContent(String content) {
            this.content = content;
            return this;
        }

        public Builder setGravity(String gravity) {
            this.gravity = gravity;
            return this;
        }

        public Builder setSize(int size) {
            this.size = size;
            return this;
        }

        public Builder setCategory(int category) {
            this.category = category;
            return this;
        }

        public Notification build(){
            return  new Notification(this);
        }
    }

    @Override
    public String toString() {
        return "Notification{" +
                "title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", gravity='" + gravity + '\'' +
                ", size=" + size +
                ", category=" + category +
                '}';
    }

    public static void main(String[] args){
        Notification notification = new Notification.Builder("淘宝","有活动了")
                .setCategory(30).setSize(100).build();
        System.out.println(notification);
    }

}
