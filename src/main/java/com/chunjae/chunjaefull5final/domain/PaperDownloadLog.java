package com.chunjae.chunjaefull5final.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "paper_download_log")
@Setter
@Getter
@NoArgsConstructor
public class PaperDownloadLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pdl_id")
    private Long pdlId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paper_id")
    private PaperInfo paperInfo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uid")
    private User uid;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "host_ip")
    private String hostIp;
}
