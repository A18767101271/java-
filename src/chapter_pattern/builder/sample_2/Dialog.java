package chapter_pattern.builder.sample_2;

/**
 * author : wislie
 * e-mail : 254457234@qq.com
 * date   : 2020/2/11 10:29 上午
 * desc   : 构建者模式
 * version: 1.0
 */
public class Dialog {

    /**
     * 标题
     */
    private String title;
    /**
     * 消息
     */
    private String msg;
    /**
     * 点击监听器
     */
    private OnClickListener onClickListener;

    public Dialog(String title, String msg) {
        this.title = title;
        this.msg = msg;
    }

    public Dialog(String title, String msg, OnClickListener onClickListener) {
        this(title, msg);
        this.onClickListener = onClickListener;
    }

    interface OnClickListener {
        /**
         * 点击
         */
        void onClick();
    }

    private static class Builder {

        private String title;

        private String msg;

        private OnClickListener onClickListener;

        public Builder title(String title) {
            this.title = title;
            return this;
        }

        public Builder msg(String msg) {
            this.msg = msg;
            return this;
        }

        public Builder setOnClickListener(OnClickListener onClickListener) {
            this.onClickListener = onClickListener;
            return this;
        }

        public Dialog build() {

            if ("".equals(title) || title == null) {
                throw new NullPointerException("title 不能为空");
            }

            if ("".equals(msg) || msg == null) {
                throw new NullPointerException("msg 不能为空");
            }

            Dialog dialog = new Dialog(title, msg);
            if (onClickListener != null) {
                dialog.setOnClickListener(onClickListener);
            }
            return dialog;

        }
    }

    private void setOnClickListener(OnClickListener onClickListener) {
        this.onClickListener = onClickListener;
    }

    /**
     * 展示
     *
     * @return
     */
    public Dialog show() {
        System.out.println("title:" + title + " msg:" + msg);
        return this;
    }

    /**
     * 点击
     *
     * @return
     */
    public Dialog onClick() {
        if (onClickListener != null) {
            onClickListener.onClick();
        }
        return this;
    }


    public static void main(String[] args) {
        new Builder()
                .title("复工")
                .msg("离复工还有1天")
                .setOnClickListener(new OnClickListener() {
                    @Override
                    public void onClick() {
                        System.out.println("点击开工");
                    }
                })
                .build()
                .show()
                .onClick();
        /**
         * 打印------------------
         * 点击开工
         * title:复工 msg:离复工还有1天
         */
    }
}
