package com.chunjae.chunjaefull5final.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "paper_download_question")
@Setter
@Getter
@NoArgsConstructor
public class PaperDownloadQuestion {
/*
  `pdq_id` BIGINT(11) NOT NULL COMMENT 'download 받은 당시 시험지에 대한 문제의 정보 테이블, 그에 대한 PK',
  `pdl_id` BIGINT(11) NOT NULL COMMENT 'paper download log 에 대한 FK',
  `item_id` INT NOT NULL COMMENT '시험 문제에 대한 정보',*/
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pdq_id")
    private Long pdqId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pdl_id")
    private PaperDownloadLog paperDownloadLog;

    @Column(name = "item_id")
    private Integer itemId;
}
